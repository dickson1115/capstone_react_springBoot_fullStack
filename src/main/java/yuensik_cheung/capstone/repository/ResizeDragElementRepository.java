package yuensik_cheung.capstone.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yuensik_cheung.capstone.model.ResizeDragElement;

@Repository
public interface ResizeDragElementRepository extends JpaRepository<ResizeDragElement, Long>{
}
