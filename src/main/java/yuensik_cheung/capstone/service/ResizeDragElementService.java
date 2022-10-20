package yuensik_cheung.capstone.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import yuensik_cheung.capstone.model.ResizeDragElement;
import yuensik_cheung.capstone.repository.ResizeDragElementRepository;

/*
 * Provide logic for ResizeDragElement logical functions
 */
@Service
public class ResizeDragElementService {

    @Autowired
    ResizeDragElementRepository resizeDragElementRepository;
    
    
    public void deleteByProjectId(Long id) {
        resizeDragElementRepository.deleteByProjectId(id);
    }



    
}
