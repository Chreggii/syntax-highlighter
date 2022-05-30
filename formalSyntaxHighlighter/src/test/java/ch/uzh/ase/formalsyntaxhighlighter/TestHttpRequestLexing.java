package ch.uzh.ase.formalsyntaxhighlighter;

import org.junit.jupiter.api.Test;
import org.skyscreamer.jsonassert.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;

/** Test the lexting part */
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class TestHttpRequestLexing {
  @LocalServerPort private int port;

  @Autowired private TestRestTemplate restTemplate;

  class LexBody {

    public LexBody(String text, String type) {
      this.text = text;
      this.type = type;
    }

    public String type;
    public String text;
  }

  /**
   * Test lexing for python hello world
   *
   * @throws Exception
   */
  @Test
  void pythonLexingHelloWorld() throws Exception {
    LexBody body = new LexBody("print(\"Hello world!\")", "python");
    String test =
        "[{\"startIndex\":0,\"endIndex\":4,\"tokenId\":42},{\"startIndex\":5,\"endIndex\":5,\"tokenId\":54},{\"startIndex\":6,\"endIndex\":19,\"tokenId\":3},{\"startIndex\":20,\"endIndex\":20,\"tokenId\":55}]";
    JSONAssert.assertEquals(
        test,
        this.restTemplate.postForObject(
            String.format("http://localhost:%s/lex-string", port), body, String.class),
        JSONCompareMode.LENIENT);
  }

  /**
   * @throws Exception Test lexing for java hello world
   */
  @Test
  void javaLexingHelloWorld() throws Exception {
    LexBody body = new LexBody("System.out.println(\"Hello World!\")", "java");
    String test =
        "[{\"startIndex\":0,\"endIndex\":5,\"tokenId\":102},{\"startIndex\":6,\"endIndex\":6,\"tokenId\":65},{\"startIndex\":7,\"endIndex\":9,\"tokenId\":102},{\"startIndex\":10,\"endIndex\":10,\"tokenId\":65},{\"startIndex\":11,\"endIndex\":17,\"tokenId\":102},{\"startIndex\":18,\"endIndex\":18,\"tokenId\":57},{\"startIndex\":19,\"endIndex\":32,\"tokenId\":55},{\"startIndex\":33,\"endIndex\":33,\"tokenId\":58}]";
    JSONAssert.assertEquals(
        test,
        this.restTemplate.postForObject(
            String.format("http://localhost:%s/lex-string", port), body, String.class),
        JSONCompareMode.LENIENT);
  }

  /**
   * Test lexing for kotlin hello world
   *
   * @throws Exception
   */
  @Test
  void kotlinLexingHelloWorld() throws Exception {
    LexBody body = new LexBody("println(\"Hello, World!\")", "kotlin");
    String test =
        "[{\"startIndex\":0,\"endIndex\":6,\"tokenId\":146},{\"startIndex\":7,\"endIndex\":7,\"tokenId\":9},{\"startIndex\":8,\"endIndex\":8,\"tokenId\":149},{\"startIndex\":9,\"endIndex\":21,\"tokenId\":160},{\"startIndex\":22,\"endIndex\":22,\"tokenId\":158},{\"startIndex\":23,\"endIndex\":23,\"tokenId\":10}]";
    JSONAssert.assertEquals(
        test,
        this.restTemplate.postForObject(
            String.format("http://localhost:%s/lex-string", port), body, String.class),
        JSONCompareMode.LENIENT);
  }

  /**
   * Test lexing for invalid type giving error response
   *
   * @throws Exception
   */
  @Test
  void invalidTypeLexingHelloWorld() throws Exception {
    LexBody body = new LexBody("println(\"Hello, World!\")", "abc");
    String test =
        "{\"error\":{\"reason\":\"abc is not a valid type ([python, kotlin, java])\",\"code\":400,\"type\":\"Bad request\"}}";
    JSONAssert.assertEquals(
        test,
        this.restTemplate.postForObject(
            String.format("http://localhost:%s/lex-string", port), body, String.class),
        JSONCompareMode.LENIENT);
  }
}
