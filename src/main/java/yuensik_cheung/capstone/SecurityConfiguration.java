

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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


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
                        "/put/**",
                        "/delete/**")
                .permitAll()
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
                .permitAll()
                .and().formLogin().successHandler(corsAuthSuccessHandler()).loginPage("/login")
                .and().csrf().disable();
    }

    @Bean
    public AuthenticationSuccessHandler corsAuthSuccessHandler() {
        return new SimpleUrlAuthenticationSuccessHandler() {
            @Override
            protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response) {
                if (request.getHeader("Origin").equals("http://localhost:3000"))
                    return request.getHeader("Origin");
                return super.determineTargetUrl(request, response);
            }
        };
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowCredentials(true);
            }
        };
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
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