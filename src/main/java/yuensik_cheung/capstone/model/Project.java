package yuensik_cheung.capstone.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/*
 * Model Class for the Project object. A project includes all the elements that build a plane including 
 * components on the front, side and top view 
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="project_id")
	private Long id;
	@Column(name="user_id")
	private Long userId;
	@OneToMany(cascade =  CascadeType.ALL)
	@JoinColumn(name="project_id")
	List<ResizeDragElement> resizeDragElements;
	
}
