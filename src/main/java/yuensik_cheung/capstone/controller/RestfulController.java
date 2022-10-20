package yuensik_cheung.capstone.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.authentication.AbstractAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import yuensik_cheung.capstone.UserService;
//import yuensik_cheung.capstone.UserService;
import yuensik_cheung.capstone.model.Project;
import yuensik_cheung.capstone.model.ResizeDragElement;
import yuensik_cheung.capstone.model.User;
import yuensik_cheung.capstone.service.ProjectService;
import yuensik_cheung.capstone.service.ResizeDragElementService;

/*
 * It is a rest controller that output a JSON/data to the react app
 */
@RestController
public class RestfulController {
    @Autowired
    ProjectService projectService;
    @Autowired
    ResizeDragElementService resizeDragElementService;
    @Autowired
    UserService userService;
    
    
    @GetMapping("/name")
    public Object userName() {
        System.out.println(SecurityContextHolder.getContext());
        UserDetails ud = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = ud.getUsername();
        System.out.println(username);
        return "123";
}
    
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/get")
    public Project getProject() {
//        UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println(SecurityContextHolder.getContext());
        UserDetails user_login = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        System.out.println("teaslkjdhalskdjhasldkjashdlkajsshdlkjhalksjdhaslkjdhst");
        System.out.println(user_login);
        User user = userService.findByEmail(user_login.getUsername());
        if(user==null) {
            System.out.println("restart the project, the user didn't exist");
        }
        else {
            List<Project> project_list = projectService.findAllbyUserId(user.getId());
            if(project_list.size()!=0) {
                return project_list.get(0);//TODO
            }
        }
        return null;
    }
    
    
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/post")
    public void postProject(@RequestBody Project project) {
        System.out.println("test"+project);
        Project project_old = projectService.findOne(project.getId());
        if(project_old==null) {
            UserDetails user_login = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            User user = userService.findByEmail(user_login.getUsername());
            project.setUserId(user.getId());
            projectService.save(project);
        }
        else {
            System.out.println("The project is already exist");
        }
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/put")
    public void putProject(@RequestBody Project project) {
        Project project_old = projectService.findOne(project.getId());
        if(project_old==null) {
            System.out.println("The project does not exist");
        }
        else {
            //delete old resizeDragElements
            List<ResizeDragElement> list = project_old.getResizeDragElements();
            List<Long> ids = new ArrayList<Long>();
            System.out.println("size of the old project = "+ list.size());
            for (ResizeDragElement resizeDragElement : list) {
                ids.add(resizeDragElement.getId());
            }
            resizeDragElementService.deleteByProjectId(project.getId());
            
            project_old.setResizeDragElements(project.getResizeDragElements());
//            System.out.println("size of the new project = "+ project.getResizeDragElements().size());
            System.out.println(project_old.getResizeDragElements().size());
            projectService.save(project_old);
            System.out.println(project_old);
        }
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/delete")
    public void deleteProject() {
        UserDetails user_login = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.findByEmail(user_login.getUsername());
        if(user==null) {
            System.out.println("restart the project, the user didn't exist");
        }
        else {
            List<Project> project_list = projectService.findAllbyUserId(user.getId());
            if(project_list.size()!=0) {
                Project project = project_list.get(0);//TODO
                 projectService.deleteByProjectId(project.getId());
            }
        }
    }
}
