package ch.uzh.ase.formalsyntaxhighlighter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class FormalSyntaxHighlighterApplication {

    @GetMapping("/")
    public String main() {
        return "Hello from Java";
    }

    public static void main(String[] args) {
        SpringApplication.run(FormalSyntaxHighlighterApplication.class, args);
    }
}
