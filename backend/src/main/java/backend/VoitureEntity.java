package backend;

import jakarta.persistence.*;
@Entity
@Table(name="voiture")

public class VoitureEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 255)
    private String modele;

    @Column(nullable = false, length = 255)
    private String couleur;

    @Column()
    private Integer garage;

    public VoitureEntity(){
    }

    public VoitureEntity(String modele, String couleur, Integer garage) {
        this.modele = modele;
        this.couleur = couleur;
        this.garage = garage;
    }

    // Getters & Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getModele() {return modele; }

    public void setModele(String modele) {
        this.modele = modele;
    }

    public String getCouleur() {
        return couleur;
    }

    public void setCouleur(String couleur) {
        this.couleur = couleur;
    }

    public Integer getGarage() {
        return garage;
    }

    public void setGarage(Integer garage) {this.garage = garage; }

}
