package yuensik_cheung.capstone.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import yuensik_cheung.capstone.model.Project;
import yuensik_cheung.capstone.repository.ProjectRepository;

/*
 * Provide logic for Project's logical functions
 */
@Service
public class ProjectService {
    @Autowired
    ProjectRepository projectRepository;

    public Project findOne(Long id) {
        return projectRepository.findOne(id);
    }

    public void save(Project project) {
        projectRepository.save(project);
    }
    public List<Project> findAllbyUserId(Long id){
        return projectRepository.findAllbyUserId(id);
    }
    public void deleteByProjectId(Long id) {
        projectRepository.deleteByProjectId(id);
    }
    
    
}
