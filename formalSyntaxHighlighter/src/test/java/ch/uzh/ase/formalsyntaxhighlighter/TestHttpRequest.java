package ch.uzh.ase.formalsyntaxhighlighter;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;

/** Test a simple http request mechanism */
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class TestHttpRequest {
  @LocalServerPort private int port;

  @Autowired private TestRestTemplate restTemplate;

  /**
   * Test to check the very simple status endpoint
   *
   * @throws Exception
   */
  @Test
  public void defaultEndpoint() throws Exception {
    assertThat(this.restTemplate.getForObject("http://localhost:" + port + "/", String.class))
        .contains("Formal Syntax Highlighter")
        .contains("\"status\":\"okay\"");
  }
}
