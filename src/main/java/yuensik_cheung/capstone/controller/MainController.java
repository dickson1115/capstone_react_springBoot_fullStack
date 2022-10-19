package yuensik_cheung.capstone.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/index")
    public String root() {
        return "index";
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/login")
    public String login(Model model) {
        return "login";
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/registration")
    public String userIndex() {
        return "registration";
    }
}