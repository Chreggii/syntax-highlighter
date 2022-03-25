package ch.uzh.ase.formalsyntaxhighlighter;

import org.junit.jupiter.api.Test;
import org.skyscreamer.jsonassert.JSONAssert;
import org.skyscreamer.jsonassert.JSONCompareMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class HttpRequestTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void defaultEndpoint() throws Exception {
        assertThat(
                this.restTemplate.getForObject("http://localhost:" + port + "/",
                        String.class)
        )
                .contains("Formal Syntax Highlighter")
                .contains("\"status\":\"okay\"");
    }

    @Test
    public void pythonLexingHelloWorld() throws Exception {
        String helloWorldProgramm = "print(\"Hello world!\")";
        String test = "[{\"startIndex\":0,\"endIndex\":4,\"tokenId\":42},{\"startIndex\":5,\"endIndex\":5,\"tokenId\":54},{\"startIndex\":6,\"endIndex\":19,\"tokenId\":3},{\"startIndex\":20,\"endIndex\":20,\"tokenId\":55}]";
        JSONAssert.assertEquals(
                test,
                this.restTemplate.getForObject(String.format("http://localhost:%s/lex-string?type=python&text=%s", port, helloWorldProgramm), String.class),
                JSONCompareMode.LENIENT
        );
    }

    @Test
    public void javaLexingHelloWorld() throws Exception {
        String helloWorldProgramm = "System.out.println(\"Hello World!\")";
        String test = "[{\"startIndex\":0,\"endIndex\":5,\"tokenId\":102},{\"startIndex\":6,\"endIndex\":6,\"tokenId\":65},{\"startIndex\":7,\"endIndex\":9,\"tokenId\":102},{\"startIndex\":10,\"endIndex\":10,\"tokenId\":65},{\"startIndex\":11,\"endIndex\":17,\"tokenId\":102},{\"startIndex\":18,\"endIndex\":18,\"tokenId\":57},{\"startIndex\":19,\"endIndex\":32,\"tokenId\":55},{\"startIndex\":33,\"endIndex\":33,\"tokenId\":58}]";
        JSONAssert.assertEquals(
                test,
                this.restTemplate.getForObject(
                        String.format("http://localhost:%s/lex-string?type=java&text=%s", port, helloWorldProgramm), String.class
                ),
                JSONCompareMode.LENIENT
        );
    }

    @Test
    public void kotlinLexingHelloWorld() throws Exception {
        String helloWorldProgramm = "println(\"Hello, World!\")";
        String test = "[{\"startIndex\":0,\"endIndex\":6,\"tokenId\":146},{\"startIndex\":7,\"endIndex\":7,\"tokenId\":9},{\"startIndex\":8,\"endIndex\":8,\"tokenId\":149},{\"startIndex\":9,\"endIndex\":21,\"tokenId\":160},{\"startIndex\":22,\"endIndex\":22,\"tokenId\":158},{\"startIndex\":23,\"endIndex\":23,\"tokenId\":10}]";
        JSONAssert.assertEquals(
                test,
                this.restTemplate.getForObject(
                        String.format("http://localhost:%s/lex-string?type=kotlin&text=%s", port, helloWorldProgramm), String.class
                ),
                JSONCompareMode.LENIENT
        );
    }
}
