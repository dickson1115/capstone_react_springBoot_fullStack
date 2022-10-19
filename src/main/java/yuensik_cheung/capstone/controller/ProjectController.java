package yuensik_cheung.capstone.controller;


import java.net.URI;
import java.net.URISyntaxException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import yuensik_cheung.capstone.model.Project;
import yuensik_cheung.capstone.repository.ProjectRepository;

@RestController
@RequestMapping("/api")
public class ProjectController {

   @Autowired
   private ProjectRepository projectRepository;


   @PutMapping("/put")
   ResponseEntity<Project> updateProject(@Valid @RequestBody Project project) {
//       log.info("Request to update group: {}", group);
       Project result = projectRepository.save(project);
       return ResponseEntity.ok().body(result);
   }
   @PostMapping("/post")
   ResponseEntity<Project> createProject(@Valid @RequestBody Project project) throws URISyntaxException {
//       log.info("Request to create group: {}", group);
	   Project result = projectRepository.save(project);
       return ResponseEntity.created(new URI("/api/group/" + result.getId())).body(result);
   }
}