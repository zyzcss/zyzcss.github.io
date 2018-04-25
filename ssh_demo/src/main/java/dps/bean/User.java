package dps.bean;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.HashSet;
import java.util.Set;

@Entity
public class User {
	private int id;
	private String user;
	private String password;
	private String eamil;
	private String gender;
	private Set<Content> content=new HashSet<Content>();
	public Set<Content> getContent() {
		return content;
	}
	public void setContents(Set<Content> content) {
		this.content = content;
	}
	public User() {
	}



	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEamil() {return eamil; }
	public void setEamil(String eamil) { this.eamil = eamil; }
	public String getGender() { return gender; }
	public void setGender(String gender) { this.gender = gender; }

	@Override
	public boolean equals(Object obj) {
		User u=(User)obj;
		if(u.getId()==this.id)return true;
		return false;
	}
}
