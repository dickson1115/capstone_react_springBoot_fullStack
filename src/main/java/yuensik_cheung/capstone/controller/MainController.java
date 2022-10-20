package yuensik_cheung.capstone.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
/*
 * Control and display the page base on the URL path
 */
@Controller
public class MainController {
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public void handleGet(HttpServletResponse response) {
        response.setHeader("Location", "http://localhost:3000");
        response.setStatus(302);
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/login")
    public String login(Model model) {
        return "login";
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/user")
    public String userIndex() {
        return "user/index";
    }
}