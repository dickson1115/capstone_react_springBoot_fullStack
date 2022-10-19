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

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor

public class ResizeDragElement {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="resizeDragElement_id")
	private Long id;
	private double position_x;
	private double position_y;
	private double height;
	private double width;
	private double z_index;
	private double index_num;
	private String image_src;
	private String view;
}
