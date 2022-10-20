package yuensik_cheung.capstone.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import yuensik_cheung.capstone.model.Project;
import yuensik_cheung.capstone.model.ResizeDragElement;
import yuensik_cheung.capstone.service.ProjectService;
import yuensik_cheung.capstone.service.ResizeDragElementService;
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@SpringBootTest
class RestfulControllerTest {

    @Autowired
    private  ProjectService projectService;
    @Autowired
    private  ResizeDragElementService resizeDragElementService;
    static Project projectTest;

    @BeforeAll
    static void setup() {
        List<ResizeDragElement> resizeDragElements = new ArrayList<ResizeDragElement>();
        ResizeDragElement resizeDragElement = new ResizeDragElement(1L,"1","841.416748046875","259.66668701171875","185.333px","112px","0",null,"http://localhost:3000/capstone_react_springBoot_fullStack/static/media/vertical_stab_front.11191d9d352655682abb.png","front","ResizeDragElement_resize_drag_element__eQOBs resize_drag_element","0","Vertical Stabilizer");
        resizeDragElements.add(resizeDragElement);
        projectTest = new Project(1L,100L,resizeDragElements);
    }
    
    
    private static Stream<Arguments> provideStringsForFindProjectTest() {
        return Stream.of(
          Arguments.of(1L, projectTest),
          Arguments.of(2L, null),
          Arguments.of(10L, null),
          Arguments.of(100L, null)
        );
    }

//    @Before
//    void setup_findProjectTest() {
//        System.out.println("input"+projectTest);
//        projectService.save(projectTest);
//    }
    @Test
    void findProjectTest() {
        projectService.save(projectTest);
        System.out.println("input"+projectTest);
        Project project = projectService.findOne(1L);
        System.out.println("output"+project);
        assertThat(project.equals(projectTest));
    }
    
    @ParameterizedTest
    @MethodSource("provideStringsForFindProjectTest")
    void findProjectTest(Long id, Project expected) {
        Project project = projectService.findOne(id);
        System.out.println("output"+project);
        assertEquals(expected,project); 
    }
//    @Test
//    void deleteElementByProjectId() {
//        projectService.save(projectTest);
//        resizeDragElementService.deleteByProjectId(2L);
//        Project project = projectService.findOne(2L);
//        System.out.println("output"+project);
//        assertEquals(null,project.getResizeDragElements());
//    }    
    @Test
    void deleteProjectTest() {
        projectService.deleteByProjectId(1L);
        Project project = projectService.findOne(1L);
        assertEquals(null,project);
    }

    

}
