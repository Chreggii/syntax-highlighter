package ch.uzh.ase.formalsyntaxhighlighter;

import java.lang.reflect.Field;
import java.util.*;
import java.util.logging.Logger;
import org.antlr.v4.misc.OrderedHashMap;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import resolver.JavaResolver;
import resolver.KotlinResolver;
import resolver.Python3Resolver;
import resolver.Resolver;

class PostBody {
  public String getType() {
    return type;
  }

  public String getText() {
    return text;
  }

  /** Global the post body for the API */
  private String text;

  private String type;
}

/**
 * The Formal Syntax Highlighter Application that uses the provided .jar file and enables enpoints
 * ot be called.
 */
@SpringBootApplication
@RestController
public class FormalSyntaxHighlighterApplication {

  Logger logger = Logger.getLogger(Logger.GLOBAL_LOGGER_NAME);

  public static final String START_INDEX = "startIndex";
  public static final String END_INDEX = "endIndex";
  public static final String TOKEN_ID = "tokenId";
  public static final String H_CODE_VALUE = "hCodeValue";

  /**
   * A helper function to get the proper resolver
   *
   * @param type the type provided in the request
   * @return the resolver
   * @throws InputMismatchException if type is invalid
   */
  private Resolver getResolver(String type) throws InputMismatchException {
    Resolver resolver;

    if (Objects.equals(type, "python")) {
      resolver = new Python3Resolver();
    } else if (Objects.equals(type, "kotlin")) {
      resolver = new KotlinResolver();
    } else if (Objects.equals(type, "java")) {
      resolver = new JavaResolver();
    } else {
      throw new InputMismatchException(type + " is not a valid type ([python, kotlin, java])");
    }
    return resolver;
  }

  /**
   * Helper function to return bad request 400
   *
   * @param reason the reason for the bad request
   * @return a Response enity of the bad request as a json
   */
  private ResponseEntity<Object> badRequest(String reason) {
    HashMap<String, Object> errorContents = new HashMap<>();
    errorContents.put("code", 400);
    errorContents.put("type", "Bad request");
    errorContents.put("reason", reason);

    HashMap<String, Object> badRequestBody = new HashMap<>();
    badRequestBody.put("error", errorContents);

    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(badRequestBody);
  }

  /**
   * Info endpoint to check if the application is running (and so there is something on /)
   *
   * @return A Simple info endpoint
   */
  @GetMapping("/")
  public Map<String, Object> main() {

    HashMap<String, Object> status = new HashMap<>();
    status.put("service", "Formal Syntax Highlighter");
    status.put("status", "okay");

    return status;
  }

  /**
   * Lexing the data means that the source code is analyzed into the destinct pieces
   *
   * @param body The source code and type as defined in the
   *     main.java.ch.uzh.ase.formalsyntaxhighlighter.PostBody class
   * @return the lexed data as a hashmap
   * @throws NoSuchFieldException
   */
  @PostMapping("/lex-string")
  public ResponseEntity<Object> lex(@RequestBody PostBody body) throws NoSuchFieldException {
    Resolver resolver;
    String type = body.getType();
    String text = body.getText();

    try {
      resolver = getResolver(type);
    } catch (InputMismatchException e) {
      return badRequest(e.getMessage());
    }

    Object[] lToks = resolver.lex(text);

    List<Map<String, Integer>> outputData = new ArrayList<>() {};
    for (Object lTok : lToks) {
      try {
        // Inflection because we don't have access to lTok through library
        Class<? extends Object> cls = lTok.getClass();

        Field startIndexField = cls.getDeclaredField(START_INDEX);
        Integer startIndex = (Integer) startIndexField.get(lTok);

        Field endIndexField = cls.getDeclaredField(END_INDEX);
        Integer endIndex = (Integer) endIndexField.get(lTok);

        Field tokenIdField = cls.getDeclaredField(TOKEN_ID);
        Integer tokenId = (Integer) tokenIdField.get(lTok);

        OrderedHashMap<String, Integer> orderedMap = new OrderedHashMap<>();
        orderedMap.put(START_INDEX, startIndex);
        orderedMap.put(END_INDEX, endIndex);
        orderedMap.put(TOKEN_ID, tokenId);

        outputData.add(orderedMap);
      } catch (Exception e) {
        logger.warning(e.getMessage());
      }
    }
    return ResponseEntity.ok(outputData);
  }

  /**
   * Use a formal model to highlight the source code.
   *
   * @param body Body the same as for the lexing function.
   * @return the data necessary for the highlighting as produced by the provided .jar file
   * @throws NoSuchFieldException
   */
  @PostMapping("/highlight-string")
  public ResponseEntity<Object> highlight(@RequestBody PostBody body) throws NoSuchFieldException {
    Resolver resolver;
    String type = body.getType();
    String text = body.getText();

    try {
      resolver = getResolver(type);
    } catch (InputMismatchException e) {
      return badRequest(e.getMessage());
    }

    Object[] hToks = resolver.highlight(text);

    List<Map<String, Integer>> outputData = new ArrayList<>() {};
    for (Object hTok : hToks) {
      try {
        // Inflection because we don't have access to hTok through library
        Class<? extends Object> cls = hTok.getClass();

        Field hCodeValueField = cls.getField(H_CODE_VALUE);
        Integer hCodeValue = (Integer) hCodeValueField.get(hTok);

        Field startIndexField = cls.getField(START_INDEX);
        Integer startIndex = (Integer) startIndexField.get(hTok);

        Field endIndexField = cls.getField(END_INDEX);
        Integer endIndex = (Integer) endIndexField.get(hTok);

        Field tokenIdField = cls.getField(TOKEN_ID);
        Integer tokenId = (Integer) tokenIdField.get(hTok);

        OrderedHashMap<String, Integer> orderedMap = new OrderedHashMap<>();
        orderedMap.put(H_CODE_VALUE, hCodeValue);
        orderedMap.put(START_INDEX, startIndex);
        orderedMap.put(END_INDEX, endIndex);
        orderedMap.put(TOKEN_ID, tokenId);

        outputData.add(orderedMap);
      } catch (Exception e) {
        logger.warning(e.getMessage());
      }
    }
    return ResponseEntity.ok(outputData);
  }

  /**
   * The different highlighting codes and their meaning.
   *
   * @return a list of the available codes.
   */
  @GetMapping("/highlighting-codes")
  public ResponseEntity<Object> codes() {
    // Not optimal but HCode enum is not available in .jar

    String[] codes = {
      "ANY",
      "KEYWORD",
      "LITERAL",
      "CHAR_STRING_LITERAL",
      "COMMENT",
      "CLASS_DECLARATOR",
      "FUNCTION_DECLARATOR",
      "VARIABLE_DECLARATOR",
      "TYPE_IDENTIFIER",
      "FUNCTION_IDENTIFIER",
      "FIELD_IDENTIFIER",
      "ANNOTATION_DECLARATOR"
    };
    ArrayList<HashMap<String, Object>> responseCodes = new ArrayList<>();
    for (int i = 0; i < codes.length; i++) {
      int finalI = i;
      HashMap<String, Object> codesHashMap = new HashMap<>();
      codesHashMap.put("name", codes[finalI]);
      codesHashMap.put(H_CODE_VALUE, finalI);

      responseCodes.add(codesHashMap);
    }
    return ResponseEntity.ok(responseCodes);
  }

  public static void main(String[] args) {
    SpringApplication.run(FormalSyntaxHighlighterApplication.class, args);
  }
}
