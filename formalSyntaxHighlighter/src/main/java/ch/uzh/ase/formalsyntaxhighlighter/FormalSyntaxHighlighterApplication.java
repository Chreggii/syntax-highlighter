package ch.uzh.ase.formalsyntaxhighlighter;

import org.antlr.v4.misc.OrderedHashMap;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import resolver.*;

import java.lang.reflect.Field;
import java.util.*;

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

    @GetMapping("/lex-string")
    public ResponseEntity<Object> lex(@RequestParam String text, @RequestParam String type) throws NoSuchFieldException {
        Resolver resolver;

        if (Objects.equals(type, "python")) {
            resolver = new Python3Resolver();
        }
        else if (Objects.equals(type, "kotlin")) {
            resolver = new KotlinResolver();
        }
        else if (Objects.equals(type, "java")) {
            resolver = new JavaResolver();
        }
        else { // Invalid type
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new HashMap<>() {
                {
                    put("error", new HashMap<>() {
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

        List<Map<String, Integer>> outputData = new ArrayList<>(){
        };
        for (Object lTok: lToks){
            try {
                // Inflection because we don't have access to lTok through library
                Class cls = lTok.getClass();

                Field startIndexField = cls.getDeclaredField("startIndex");
                Integer startIndex = (Integer) startIndexField.get(lTok);

                Field endIndexField = cls.getDeclaredField("endIndex");
                Integer endIndex = (Integer) endIndexField.get(lTok);

                Field tokenIdField = cls.getDeclaredField("tokenId");
                Integer tokenId = (Integer) tokenIdField.get(lTok);

                outputData.add(new OrderedHashMap<>(){{
                    // Ordered hashmap so we get the described output format
                    put("startIndex", startIndex);
                    put("endIndex", endIndex);
                    put("tokenId", tokenId);
                }});
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return ResponseEntity.ok(outputData);

    }

    @GetMapping("/highlight-string")
    public ResponseEntity<Object> highlight(@RequestParam String text, @RequestParam String type) throws NoSuchFieldException {
        Resolver resolver;

        if (Objects.equals(type, "python")) {
            resolver = new Python3Resolver();
        }
        else if (Objects.equals(type, "kotlin")) {
            resolver = new KotlinResolver();
        }
        else if (Objects.equals(type, "java")) {
            resolver = new JavaResolver();
        }
        else { // Invalid type
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new HashMap<>() {
                {
                    put("error", new HashMap<>() {
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

        List<Map<String, Integer>> outputData = new ArrayList<>(){
        };
        for (Object hTok: hToks){
            
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

                outputData.add(new OrderedHashMap<>(){{
                    // Ordered hashmap so we get the described output format
                    put("hCodeValue", hCodeValue);
                    put("startIndex", startIndex);
                    put("endIndex", endIndex);
                    put("tokenId", tokenId);
                }});
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return ResponseEntity.ok(outputData);

    }

    public static void main(String[] args) {
        SpringApplication.run(FormalSyntaxHighlighterApplication.class, args);
    }
}
