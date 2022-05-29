package ch.uzh.ase.formalsyntaxhighlighter;

import java.lang.reflect.Field;
import java.util.*;
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
  /** Global the post body for the API */
  public String text;

  public String type;
}

/**
 * The Formal Syntax Highlighter Application that uses the provided .jar file and enables enpoints
 * ot be called.
 */
@SpringBootApplication
@RestController
public class FormalSyntaxHighlighterApplication {

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
  private ResponseEntity badRequest(String reason) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(
            new HashMap<>() {

              {
                put(
                    "error",
                    new HashMap<>() {
                      {
                        put("code", 400);
                        put("type", "Bad request");
                        put("reason", reason);
                      }
                    });
              }
            });
  }

  /**
   * Info endpoint to check if the application is running (and so there is something on /)
   *
   * @return A Simple info endpoint
   */
  @GetMapping("/")
  public Map<String, Object> main() {
    return new HashMap<>() {

      {
        put("service", "Formal Syntax Highlighter");
        put("status", "okay");
      }
    };
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
    String type = body.type;
    String text = body.text;

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
        Class cls = lTok.getClass();

        Field startIndexField = cls.getDeclaredField(START_INDEX);
        Integer startIndex = (Integer) startIndexField.get(lTok);

        Field endIndexField = cls.getDeclaredField(END_INDEX);
        Integer endIndex = (Integer) endIndexField.get(lTok);

        Field tokenIdField = cls.getDeclaredField(TOKEN_ID);
        Integer tokenId = (Integer) tokenIdField.get(lTok);

        outputData.add(
            new OrderedHashMap<>() {

              {
                // Ordered hashmap so we get the described output format
                put(START_INDEX, startIndex);
                put(END_INDEX, endIndex);
                put(TOKEN_ID, tokenId);
              }
            });
      } catch (Exception e) {
        e.printStackTrace();
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
    String type = body.type;
    String text = body.text;

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
        Class cls = hTok.getClass();

        Field hCodeValueField = cls.getField(H_CODE_VALUE);
        Integer hCodeValue = (Integer) hCodeValueField.get(hTok);

        Field startIndexField = cls.getField(START_INDEX);
        Integer startIndex = (Integer) startIndexField.get(hTok);

        Field endIndexField = cls.getField(END_INDEX);
        Integer endIndex = (Integer) endIndexField.get(hTok);

        Field tokenIdField = cls.getField(TOKEN_ID);
        Integer tokenId = (Integer) tokenIdField.get(hTok);

        outputData.add(
            new OrderedHashMap<>() {

              {
                // Ordered hashmap so we get the described output format
                put(H_CODE_VALUE, hCodeValue);
                put(START_INDEX, startIndex);
                put(END_INDEX, endIndex);
                put(TOKEN_ID, tokenId);
              }
            });
      } catch (Exception e) {
        e.printStackTrace();
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
    return ResponseEntity.ok(
        new ArrayList<>() {

          {
            //          {"name": "ANY", "hCodeValue": 0},
            add(
                new HashMap<String, Object>() {

                  {
                    put("name", "ANY");
                    put(H_CODE_VALUE, 0);
                  }
                });

            //          {"name": "KEYWORD", "hCodeValue": 1},
            add(
                new HashMap<String, Object>() {

                  {
                    put("name", "KEYWORD");
                    put(H_CODE_VALUE, 1);
                  }
                });

            //          {"name": "LITERAL", "hCodeValue": 2},
            add(
                new HashMap<String, Object>() {

                  {
                    put("name", "LITERAL");
                    put(H_CODE_VALUE, 2);
                  }
                });

            //          {"name": "CHAR_STRING_LITERAL", "hCodeValue": 3},
            add(
                new HashMap<String, Object>() {

                  {
                    put("name", "CHAR_STRING_LITERAL");
                    put(H_CODE_VALUE, 3);
                  }
                });

            //          {"name": "COMMENT", "hCodeValue": 4},
            add(
                new HashMap<String, Object>() {

                  {
                    put("name", "COMMENT");
                    put(H_CODE_VALUE, 4);
                  }
                });

            //          {"name": "CLASS_DECLARATOR", "hCodeValue": 5},
            add(
                new HashMap<String, Object>() {

                  {
                    put("name", "CLASS_DECLARATOR");
                    put(H_CODE_VALUE, 5);
                  }
                });

            //          {"name": "FUNCTION_DECLARATOR", "hCodeValue": 6},
            add(
                new HashMap<String, Object>() {

                  {
                    put("name", "FUNCTION_DECLARATOR");
                    put(H_CODE_VALUE, 6);
                  }
                });

            //          {"name": "VARIABLE_DECLARATOR", "hCodeValue": 7},
            add(
                new HashMap<String, Object>() {

                  {
                    put("name", "VARIABLE_DECLARATOR");
                    put(H_CODE_VALUE, 7);
                  }
                });

            //          {"name": "TYPE_IDENTIFIER", "hCodeValue": 8},
            add(
                new HashMap<String, Object>() {

                  {
                    put("name", "TYPE_IDENTIFIER");
                    put(H_CODE_VALUE, 8);
                  }
                });

            //          {"name": "FUNCTION_IDENTIFIER", "hCodeValue": 9},
            add(
                new HashMap<String, Object>() {

                  {
                    put("name", "FUNCTION_IDENTIFIER");
                    put(H_CODE_VALUE, 9);
                  }
                });

            //          {"name": "FIELD_IDENTIFIER", "hCodeValue": 10},
            add(
                new HashMap<String, Object>() {

                  {
                    put("name", "FIELD_IDENTIFIER");
                    put(H_CODE_VALUE, 10);
                  }
                });

            //          {"name": "ANNOTATION_DECLARATOR", "hCodeValue": 11}
            add(
                new HashMap<String, Object>() {

                  {
                    put("name", "ANNOTATION_DECLARATOR");
                    put(H_CODE_VALUE, 11);
                  }
                });
          }
        });
  }

  public static void main(String[] args) {
    SpringApplication.run(FormalSyntaxHighlighterApplication.class, args);
  }
}
