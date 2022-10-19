package yuensik_cheung.capstone.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import yuensik_cheung.capstone.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
//	@Query("SELECT DISTINCT u FROM USER u left join fetch u.project WHERE u.email = :email")
  User findByEmail(String email);
}