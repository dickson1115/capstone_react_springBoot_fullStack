package yuensik_cheung.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import yuensik_cheung.capstone.model.Group;

import java.util.List;

public interface GroupRepository extends JpaRepository<Group, Long> {
    Group findByName(String name);
}