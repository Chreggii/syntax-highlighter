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
  public String text;
  public String type;
}

@SpringBootApplication
@RestController
public class FormalSyntaxHighlighterApplication {

  @GetMapping("/")
  public Map<String, Object> main() {
    return new HashMap<>() {

      {
        put("service", "Formal Syntax Highlighter");
        put("status", "okay");
      }
    };
  }

  @PostMapping("/lex-string")
  public ResponseEntity<Object> lex(@RequestBody PostBody body) throws NoSuchFieldException {
    Resolver resolver;
    String type = body.type;
    String text = body.text;

    if (Objects.equals(type, "python")) {
      resolver = new Python3Resolver();
    } else if (Objects.equals(type, "kotlin")) {
      resolver = new KotlinResolver();
    } else if (Objects.equals(type, "java")) {
      resolver = new JavaResolver();
    } else { // Invalid type
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
                          put("reason", type + " is not a valid type ([python, kotlin, java])");
                        }
                      });
                }
              });
    }
    Object[] lToks = resolver.lex(text);

    List<Map<String, Integer>> outputData = new ArrayList<>() {};
    for (Object lTok : lToks) {
      try {
        // Inflection because we don't have access to lTok through library
        Class cls = lTok.getClass();

        Field startIndexField = cls.getDeclaredField("startIndex");
        Integer startIndex = (Integer) startIndexField.get(lTok);

        Field endIndexField = cls.getDeclaredField("endIndex");
        Integer endIndex = (Integer) endIndexField.get(lTok);

        Field tokenIdField = cls.getDeclaredField("tokenId");
        Integer tokenId = (Integer) tokenIdField.get(lTok);

        outputData.add(
            new OrderedHashMap<>() {

              {
                // Ordered hashmap so we get the described output format
                put("startIndex", startIndex);
                put("endIndex", endIndex);
                put("tokenId", tokenId);
              }
            });
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
    return ResponseEntity.ok(outputData);
  }

  @PostMapping("/highlight-string")
  public ResponseEntity<Object> highlight(@RequestBody PostBody body) throws NoSuchFieldException {
    Resolver resolver;
    String type = body.type;
    String text = body.text;

    if (Objects.equals(type, "python")) {
      resolver = new Python3Resolver();
    } else if (Objects.equals(type, "kotlin")) {
      resolver = new KotlinResolver();
    } else if (Objects.equals(type, "java")) {
      resolver = new JavaResolver();
    } else { // Invalid type
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
                          put("reason", type + " is not a valid type ([python, kotlin, java])");
                        }
                      });
                }
              });
    }
    Object[] hToks = resolver.highlight(text);

    List<Map<String, Integer>> outputData = new ArrayList<>() {};
    for (Object hTok : hToks) {
      try {
        // Inflection because we don't have access to hTok through library
        Class cls = hTok.getClass();

        Field hCodeValueField = cls.getField("hCodeValue");
        Integer hCodeValue = (Integer) hCodeValueField.get(hTok);

        Field startIndexField = cls.getField("startIndex");
        Integer startIndex = (Integer) startIndexField.get(hTok);

        Field endIndexField = cls.getField("endIndex");
        Integer endIndex = (Integer) endIndexField.get(hTok);

        Field tokenIdField = cls.getField("tokenId");
        Integer tokenId = (Integer) tokenIdField.get(hTok);

        outputData.add(
            new OrderedHashMap<>() {

              {
                // Ordered hashmap so we get the described output format
                put("hCodeValue", hCodeValue);
                put("startIndex", startIndex);
                put("endIndex", endIndex);
                put("tokenId", tokenId);
              }
            });
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
    return ResponseEntity.ok(outputData);
  }

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
                    put("hCodeValue", 0);
                  }
                });

            //          {"name": "KEYWORD", "hCodeValue": 1},
            add(
                new HashMap<String, Object>() {

                  {
                    put("name", "KEYWORD");
                    put("hCodeValue", 1);
                  }
                });

            //          {"name": "LITERAL", "hCodeValue": 2},
            add(
                new HashMap<String, Object>() {

                  {
                    put("name", "LITERAL");
                    put("hCodeValue", 2);
                  }
                });

            //          {"name": "CHAR_STRING_LITERAL", "hCodeValue": 3},
            add(
                new HashMap<String, Object>() {

                  {
                    put("name", "CHAR_STRING_LITERAL");
                    put("hCodeValue", 3);
                  }
                });

            //          {"name": "COMMENT", "hCodeValue": 4},
            add(
                new HashMap<String, Object>() {

                  {
                    put("name", "COMMENT");
                    put("hCodeValue", 4);
                  }
                });

            //          {"name": "CLASS_DECLARATOR", "hCodeValue": 5},
            add(
                new HashMap<String, Object>() {

                  {
                    put("name", "CLASS_DECLARATOR");
                    put("hCodeValue", 5);
                  }
                });

            //          {"name": "FUNCTION_DECLARATOR", "hCodeValue": 6},
            add(
                new HashMap<String, Object>() {

                  {
                    put("name", "FUNCTION_DECLARATOR");
                    put("hCodeValue", 6);
                  }
                });

            //          {"name": "VARIABLE_DECLARATOR", "hCodeValue": 7},
            add(
                new HashMap<String, Object>() {

                  {
                    put("name", "VARIABLE_DECLARATOR");
                    put("hCodeValue", 7);
                  }
                });

            //          {"name": "TYPE_IDENTIFIER", "hCodeValue": 8},
            add(
                new HashMap<String, Object>() {

                  {
                    put("name", "TYPE_IDENTIFIER");
                    put("hCodeValue", 8);
                  }
                });

            //          {"name": "FUNCTION_IDENTIFIER", "hCodeValue": 9},
            add(
                new HashMap<String, Object>() {

                  {
                    put("name", "FUNCTION_IDENTIFIER");
                    put("hCodeValue", 9);
                  }
                });

            //          {"name": "FIELD_IDENTIFIER", "hCodeValue": 10},
            add(
                new HashMap<String, Object>() {

                  {
                    put("name", "FIELD_IDENTIFIER");
                    put("hCodeValue", 10);
                  }
                });

            //          {"name": "ANNOTATION_DECLARATOR", "hCodeValue": 11}
            add(
                new HashMap<String, Object>() {

                  {
                    put("name", "ANNOTATION_DECLARATOR");
                    put("hCodeValue", 11);
                  }
                });
          }
        });
  }

  public static void main(String[] args) {
    SpringApplication.run(FormalSyntaxHighlighterApplication.class, args);
  }
}
