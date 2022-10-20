package yuensik_cheung.capstone.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import yuensik_cheung.capstone.model.User;
/*
 * Database SQL commend between User object and User table
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	@Query("SELECT DISTINCT u FROM User u left join fetch u.roles WHERE u.email = :email")
  User findByEmail(String email);
	
}