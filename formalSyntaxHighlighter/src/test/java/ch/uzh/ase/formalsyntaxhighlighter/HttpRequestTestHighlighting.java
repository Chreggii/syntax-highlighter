package ch.uzh.ase.formalsyntaxhighlighter;

import org.junit.jupiter.api.Test;
import org.skyscreamer.jsonassert.JSONAssert;
import org.skyscreamer.jsonassert.JSONCompareMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class HttpRequestTestHighlighting {
  @LocalServerPort private int port;

  @Autowired private TestRestTemplate restTemplate;

  class HighlightBody {

    public HighlightBody(String text, String type) {
      this.text = text;
      this.type = type;
    }

    public String type;
    public String text;
  }

  @Test
  public void pythonHighlightingHelloWorld() throws Exception {
    HighlightBody body = new HighlightBody("print(\"Hello world!\")", "python");
    String test =
        "[{\"hCodeValue\":9,\"startIndex\":0,\"endIndex\":4,\"tokenId\":42},{\"hCodeValue\":0,\"startIndex\":5,\"endIndex\":5,\"tokenId\":54},{\"hCodeValue\":3,\"startIndex\":6,\"endIndex\":19,\"tokenId\":3},{\"hCodeValue\":0,\"startIndex\":20,\"endIndex\":20,\"tokenId\":55},{\"hCodeValue\":0,\"startIndex\":21,\"endIndex\":20,\"tokenId\":-1}]";
    JSONAssert.assertEquals(
        test,
        this.restTemplate.postForObject(
            String.format("http://localhost:%s/highlight-string", port), body, String.class),
        JSONCompareMode.LENIENT);
  }

  @Test
  public void javaHighlightingHelloWorld() throws Exception {
    HighlightBody body = new HighlightBody("System.out.println(\"Hello World!\")", "java");
    String test =
        "[{\"hCodeValue\":0,\"startIndex\":0,\"endIndex\":5,\"tokenId\":102},{\"hCodeValue\":0,\"startIndex\":6,\"endIndex\":6,\"tokenId\":65},{\"hCodeValue\":0,\"startIndex\":7,\"endIndex\":9,\"tokenId\":102},{\"hCodeValue\":0,\"startIndex\":10,\"endIndex\":10,\"tokenId\":65},{\"hCodeValue\":0,\"startIndex\":11,\"endIndex\":17,\"tokenId\":102},{\"hCodeValue\":0,\"startIndex\":18,\"endIndex\":18,\"tokenId\":57},{\"hCodeValue\":3,\"startIndex\":19,\"endIndex\":32,\"tokenId\":55},{\"hCodeValue\":0,\"startIndex\":33,\"endIndex\":33,\"tokenId\":58},{\"hCodeValue\":0,\"startIndex\":34,\"endIndex\":33,\"tokenId\":-1}]";
    JSONAssert.assertEquals(
        test,
        this.restTemplate.postForObject(
            String.format("http://localhost:%s/highlight-string", port), body, String.class),
        JSONCompareMode.LENIENT);
  }

  @Test
  public void kotlinHighlightingHelloWorld() throws Exception {
    HighlightBody body = new HighlightBody("println(\"Hello, World!\")", "kotlin");
    String test =
        "[{\"hCodeValue\":0,\"startIndex\":0,\"endIndex\":6,\"tokenId\":146},{\"hCodeValue\":0,\"startIndex\":7,\"endIndex\":7,\"tokenId\":9},{\"hCodeValue\":3,\"startIndex\":8,\"endIndex\":8,\"tokenId\":149},{\"hCodeValue\":3,\"startIndex\":9,\"endIndex\":21,\"tokenId\":160},{\"hCodeValue\":3,\"startIndex\":22,\"endIndex\":22,\"tokenId\":158},{\"hCodeValue\":0,\"startIndex\":23,\"endIndex\":23,\"tokenId\":10},{\"hCodeValue\":0,\"startIndex\":24,\"endIndex\":23,\"tokenId\":-1}]";
    JSONAssert.assertEquals(
        test,
        this.restTemplate.postForObject(
            String.format("http://localhost:%s/highlight-string", port), body, String.class),
        JSONCompareMode.LENIENT);
  }

  @Test
  public void invalidTypeHighlighting() throws Exception {
    HighlightBody body = new HighlightBody("println(\"Hello, World!\")", "abc");
    String test =
        "{\"error\":{\"reason\":\"abc is not a valid type ([python, kotlin, java])\",\"code\":400,\"type\":\"Bad request\"}}";
    JSONAssert.assertEquals(
        test,
        this.restTemplate.postForObject(
            String.format("http://localhost:%s/highlight-string", port), body, String.class),
        JSONCompareMode.LENIENT);
  }

  @Test
  public void getHighlightingCodes() throws Exception {
    String helloWorldProgram = "println(\"Hello, World!\")";
    String test =
        "[{\"name\":\"ANY\",\"hCodeValue\":0},{\"name\":\"KEYWORD\",\"hCodeValue\":1},{\"name\":\"LITERAL\",\"hCodeValue\":2},{\"name\":\"CHAR_STRING_LITERAL\",\"hCodeValue\":3},{\"name\":\"COMMENT\",\"hCodeValue\":4},{\"name\":\"CLASS_DECLARATOR\",\"hCodeValue\":5},{\"name\":\"FUNCTION_DECLARATOR\",\"hCodeValue\":6},{\"name\":\"VARIABLE_DECLARATOR\",\"hCodeValue\":7},{\"name\":\"TYPE_IDENTIFIER\",\"hCodeValue\":8},{\"name\":\"FUNCTION_IDENTIFIER\",\"hCodeValue\":9},{\"name\":\"FIELD_IDENTIFIER\",\"hCodeValue\":10},{\"name\":\"ANNOTATION_DECLARATOR\",\"hCodeValue\":11}]";
    JSONAssert.assertEquals(
        test,
        this.restTemplate.getForObject(
            String.format("http://localhost:%s/highlighting-codes", port, helloWorldProgram),
            String.class),
        JSONCompareMode.LENIENT);
  }
}
