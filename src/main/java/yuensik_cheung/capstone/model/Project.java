package yuensik_cheung.capstone.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {
	@Id
	@Column(name="project_id")
	private Long id;
	private String name;
	@OneToMany(cascade =  CascadeType.ALL)
	List<ResizeDragElement> resizeDragElements;
	
}
