package yuensik_cheung.capstone.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/*
 * Role are seperated in to Guest, Admin amd normal users
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Role {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;
   private String name;


//   public Role() {
//   }
//
   public Role(String name) {
       this.name = name;
   }
//   public Long getId() {
//       return id;
//   }
//   public void setId(Long id) {
//       this.id = id;
//   }
//
//   public String getName() {
//       return name;
//   }
//
//   public void setName(String name) {
//       this.name = name;
//   }

//   @Override
//   public String toString() {
//       return "Role{" +
//               "id=" + id +
//               ", name='" + name + '\'' +
//               '}';
//   }
}
