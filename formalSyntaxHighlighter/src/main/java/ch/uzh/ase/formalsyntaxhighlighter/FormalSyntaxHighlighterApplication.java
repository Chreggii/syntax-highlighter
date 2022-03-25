package ch.uzh.ase.formalsyntaxhighlighter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import resolver.*;

@SpringBootApplication
@RestController
public class FormalSyntaxHighlighterApplication {

    @GetMapping("/")
    public Map<String, Object> main() {
        return new HashMap<>(){
            {
                put("service", "Formal Syntax Highlighter");
                put("status", "okay");
            }
        };
    }

    public static void main(String[] args) {
        SpringApplication.run(FormalSyntaxHighlighterApplication.class, args);
    }
}
