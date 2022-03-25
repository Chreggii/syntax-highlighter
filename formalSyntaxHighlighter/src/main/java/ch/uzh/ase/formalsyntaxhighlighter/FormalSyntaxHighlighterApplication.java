package ch.uzh.ase.formalsyntaxhighlighter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import resolver.*;

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
    public ResponseEntity<Object> lex(@RequestParam String text, @RequestParam String type) {

        if (Objects.equals(type, "python")) {
            Python3Resolver resolver = new Python3Resolver();

            return ResponseEntity.ok(new HashMap<>() {
                {
                    put("language", "Python");
                    put("source code", text);
                }
            });
        }
        if (Objects.equals(type, "kotlin")) {
            KotlinResolver resolver = new KotlinResolver();

            return ResponseEntity.ok(new HashMap<>() {
                {
                    put("language", "Kotlin");
                    put("source code", text);
                }
            });
        }
        if (Objects.equals(type, "java")) {
            JavaResolver resolver = new JavaResolver();
            return ResponseEntity.ok(new HashMap<>() {
                {
                    put("language", "Java");
                    put("source code", text);
                }
            });
        }
        // Invalid type
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new HashMap<>(){
            {
                put("error", new HashMap<>(){
                    {
                        put("code", 400);
                        put("type", "Bad request");
                        put("reason", type + " is not a valid type ([python, kotlin, java])");
                    }
                });
            }
        });
    }

    public static void main(String[] args) {
        SpringApplication.run(FormalSyntaxHighlighterApplication.class, args);
    }
}
