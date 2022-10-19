package yuensik_cheung.capstone;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import yuensik_cheung.capstone.model.Project;
import yuensik_cheung.capstone.model.ResizeDragElement;
import yuensik_cheung.capstone.repository.ProjectRepository;

@Component
//class Initializer implements CommandLineRunner {
//
//    private final GroupRepository repository;
//
//    public Initializer(GroupRepository repository) {
//        this.repository = repository;
//    }
//
//    @Override
//    public void run(String... strings) {
//        Stream.of("Seattle JUG", "Denver JUG", "Dublin JUG",
//                "London JUG").forEach(name ->
//                repository.save(new Group(name))
//        );
//
//        Group djug = repository.findByName("Seattle JUG");
//        Event e = Event.builder().title("Micro Frontends for Java Developers")
//                .description("JHipster now has microfrontend support!")
//                .date(Instant.parse("2022-09-13T17:00:00.000Z"))
//                .build();
//        djug.setEvents(Collections.singleton(e));
//        repository.save(djug);
//
//        repository.findAll().forEach(System.out::println);
//    }
//}
class Initializer implements CommandLineRunner {

    private final ProjectRepository repository;

    public Initializer(ProjectRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) {
    	ResizeDragElement resizeDragElement = new ResizeDragElement(1L,12,50,100,200,0,0,"","front");
    	ResizeDragElement resizeDragElement2 = new ResizeDragElement(2L,50,50,100,200,1,1,"","front");
    	ResizeDragElement resizeDragElement3 = new ResizeDragElement(3L,100,50,100,200,2,2,"","front");
    	System.out.println("1231231231231232"+resizeDragElement);
    	ResizeDragElement[] arr = {resizeDragElement,resizeDragElement2,resizeDragElement3};
    	List<ResizeDragElement> list = new ArrayList<ResizeDragElement>(Arrays.asList(arr));
    	Project	project = new Project(1L,"name",list);
    	repository.save(project);
    	Project project1 = repository.findOne(1L);
        System.out.println(project1);
        System.out.println(project1.getResizeDragElements());
    }
}