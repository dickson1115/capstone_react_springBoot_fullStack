package yuensik_cheung.capstone.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import yuensik_cheung.capstone.model.Project;
import yuensik_cheung.capstone.model.ResizeDragElement;
/*
 * Database SQL commend between ResizeDragElement object and ResizeDragElement table
 */
@Repository
public interface ResizeDragElementRepository extends JpaRepository<ResizeDragElement, Long>{
@Query(value="Delete From resize_drag_element where project_id= :id", nativeQuery = true)
 void deleteByProjectId(Long id);

}
