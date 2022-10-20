package yuensik_cheung.capstone;
import org.springframework.security.core.userdetails.UserDetailsService;

import yuensik_cheung.capstone.model.User;

public interface UserService extends UserDetailsService {
   User findByEmail(String email);
   User save(UserRegistrationDto registration);
}