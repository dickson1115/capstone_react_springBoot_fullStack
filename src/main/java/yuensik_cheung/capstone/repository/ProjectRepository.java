package yuensik_cheung.capstone.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import yuensik_cheung.capstone.model.Project;
import yuensik_cheung.capstone.model.ResizeDragElement;
/*
 * Database SQL commend between Project object and project table
 */
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long>{
	@Query("SELECT distinct p FROM Project p left join fetch p.resizeDragElements WHERE p.id = :id")
	Project findOne(Long id);

    @Query("SELECT p FROM Project p WHERE p.userId = :id")
    List<Project> findAllbyUserId(Long id);
	
    @Query(value="Delete From project where project_id= :id", nativeQuery = true)
    void deleteByProjectId(Long id);
}