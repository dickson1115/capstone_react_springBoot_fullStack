

package yuensik_cheung.capstone;
//
////import org.springframework.context.annotation.Bean;
////import org.springframework.security.config.annotation.web.builders.HttpSecurity;
////import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
////import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
////import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
////import org.springframework.security.web.SecurityFilterChain;
////import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
////import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
////import org.springframework.security.web.savedrequest.RequestCache;
////import org.springframework.security.web.savedrequest.SimpleSavedRequest;
////
////import javax.servlet.http.HttpServletRequest;
////import javax.servlet.http.HttpServletResponse;
////
////@EnableWebSecurity
////public class SecurityConfiguration {
////
////    @Bean
////    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
////        http
////            .authorizeHttpRequests((authz) -> authz
////                .antMatchers("/**/*.{js,html,css}").permitAll()
//////                .antMatchers("/", "/api/user").permitAll()
////                .anyRequest().authenticated()
////            )
////            .csrf((csrf) -> csrf
////                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
////            )
////            .oauth2Login();
////        return http.build();
////    }
////
////    @Bean
////    public RequestCache refererRequestCache() {
////        return new HttpSessionRequestCache() {
////            @Override
////            public void saveRequest(HttpServletRequest request, HttpServletResponse response) {
////                String referrer = request.getHeader("referer");
////                if (referrer != null) {
////                    request.getSession().setAttribute("SPRING_SECURITY_SAVED_REQUEST",
////                        new SimpleSavedRequest(referrer));
////                }
////            }
////        };
////    }
////  @Bean
////  public BCryptPasswordEncoder passwordEncoder(){
////      return new BCryptPasswordEncoder();
////  }
////}

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
// We will create userService class in upcoming step
   @Autowired
   private UserService userService;

   @Override
   protected void configure(HttpSecurity http) throws Exception {
       http.cors().and()
               .authorizeRequests()
                   .antMatchers(
                           "/registration**",
                           "/js/**",
                           "/css/**",
                           "/img/**",
                           "/webjars/**",
                           "/get/**",
                           "/put/**").permitAll()
                   .anyRequest().authenticated()
               .and()
                   .formLogin()
                       .loginPage("/login")
                           .permitAll()
               .and()
                   .logout()
                       .invalidateHttpSession(true)
                       .clearAuthentication(true)
                       .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                       .logoutSuccessUrl("/login?logout")
               .permitAll();
   }

   @Bean
   public BCryptPasswordEncoder passwordEncoder(){
       return new BCryptPasswordEncoder();
   }

   @Bean
   public DaoAuthenticationProvider authenticationProvider(){
       DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
       auth.setUserDetailsService(userService);
       auth.setPasswordEncoder(passwordEncoder());
       return auth;
   }

   @Override
   protected void configure(AuthenticationManagerBuilder auth) throws Exception {
       auth.authenticationProvider(authenticationProvider());
   }

}