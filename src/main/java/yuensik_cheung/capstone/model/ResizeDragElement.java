package yuensik_cheung.capstone.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
/*
 * This is a React component that going to display on the builder page. There attribute are essential for calculating
 * the aircraft perform later the project
 */
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor

public class ResizeDragElement {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="resizeDragElement_id")
	private Long id;
    @Column(name="project_id")
    private String projectId;
	private String data_x;
	private String data_y;
	private String height;
	private String width;
	private String z_index;
	private String index_num;
	private String src;
	private String view;
	private String className;
	private String tabIndex;
	private String part_type;
	
}
