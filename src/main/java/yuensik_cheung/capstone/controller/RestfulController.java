package yuensik_cheung.capstone.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import yuensik_cheung.capstone.model.Project;

@RestController
public class RestfulController {
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/")
    public String fetchData() {
        
        return "";
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/post")
    public void getPost(@RequestBody String s) {
        System.out.println(s);
    }
}
