package yuensik_cheung.capstone.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import yuensik_cheung.capstone.model.Project;
import yuensik_cheung.capstone.model.ResizeDragElement;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long>{
	@Query("SELECT distinct p FROM Project p left join fetch p.resizeDragElements WHERE p.id = :id")
	Project findOne(Long id);
	}