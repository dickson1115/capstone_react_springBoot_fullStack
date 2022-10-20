//package yuensik_cheung.capstone;
//
//
//import java.util.HashMap;
//import java.util.Map;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.web.PortMapper;
//import org.springframework.security.web.PortMapperImpl;
//import org.springframework.security.web.PortResolverImpl;
//import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
//import org.springframework.security.web.savedrequest.RequestCache;
//import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
//
//@EnableWebSecurity
//public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
//  @Autowired
//  private UserService userService;
////    @Value("${server.port}")
////    private int serverPort;
////
////    @Value("${security.sslRedirectPort}")
////    private int sslRedirectPort;
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http.cors().and()
//                .authorizeRequests()
//                    .antMatchers(
//                            "/registration**",
//                            "/js/**",
//                            "/css/**",
//                            "/img/**",
//                            "/webjars/**",
//                            "/get**",
//                            "/put**").permitAll()
//                    .anyRequest().authenticated()
//                .and()
//                    .formLogin()
//                        .loginPage("/login")
//                            .permitAll()
//                .and()
//                    .logout()
//                        .invalidateHttpSession(true)
//                        .clearAuthentication(true)
//                        .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
//                        .logoutSuccessUrl("/login?logout")
//                .permitAll();
//    }
//
////    private PortMapper portMapper() {
////        PortMapperImpl portMapper = new PortMapperImpl();
////        Map<String, String> mappings = new HashMap();
////        mappings.put(Integer.toString(serverPort), Integer.toString(sslRedirectPort));
////        portMapper.setPortMappings(mappings);
////        return portMapper;
////    }
//
////    private RequestCache requestCache() {
////        HttpSessionRequestCache requestCache = new HttpSessionRequestCache();
////        PortResolverImpl portResolver = new PortResolverImpl();
////        portResolver.setPortMapper(portMapper());
////        requestCache.setPortResolver(portResolver);
////        return requestCache;
////    }
//    @Bean
//    public BCryptPasswordEncoder passwordEncoder(){
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public DaoAuthenticationProvider authenticationProvider(){
//        DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
//        auth.setUserDetailsService(userService);
//        auth.setPasswordEncoder(passwordEncoder());
//        return auth;
//    }
//
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.authenticationProvider(authenticationProvider());
//    }
//
//}