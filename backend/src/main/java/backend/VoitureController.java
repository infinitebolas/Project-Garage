package backend;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/voiture")
public class VoitureController {
    final VoitureRepository voitureRepository;

    public VoitureController(VoitureRepository voitureRepository){
        this.voitureRepository = voitureRepository;
    }

    @GetMapping
    public ResponseEntity<List<VoitureEntity>> getAllVoitures(){
        return new ResponseEntity<>(voitureRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<VoitureEntity> createVoiture(@RequestBody VoitureEntity voiture) {
        VoitureEntity voitureCreated = voitureRepository.save(voiture);
        return new ResponseEntity<>(voitureCreated, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VoitureEntity> getVoitureById(@PathVariable Integer id) {
        Optional<VoitureEntity> voiture = voitureRepository.findById(id);
        return voiture.map(voitureEntity -> new ResponseEntity<>(voitureEntity, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));

    }

    @PutMapping("/{id}")
    public ResponseEntity<VoitureEntity> updateVoiture(@PathVariable Integer id, @RequestBody VoitureEntity voitureUpdate){
        Optional<VoitureEntity> voiture = voitureRepository.findById(id);
        if (voiture.isPresent()){
            VoitureEntity existingVoiture = voiture.get();
            existingVoiture.setCouleur(voitureUpdate.getCouleur());
            existingVoiture.setModele(voitureUpdate.getModele());
            existingVoiture.setGarage(voitureUpdate.getGarage());

            VoitureEntity updateVoiture = voitureRepository.save(existingVoiture);
            return new ResponseEntity<>(updateVoiture, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVoiture(@PathVariable Integer id) {
        Optional<VoitureEntity> voiture = voitureRepository.findById(id);
        if (voiture.isPresent()){
            voitureRepository.delete(voiture.get());
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/garage/{id}")
    public ResponseEntity<List<VoitureEntity>> getVoituresByGarage(@PathVariable Integer id){
        List<VoitureEntity> voitures = voitureRepository.findByGarage(id);
        return new ResponseEntity<>(voitures, HttpStatus.OK);
    }

    @PatchMapping("/{id}/garage")
    public ResponseEntity<VoitureEntity> updateGarage(@PathVariable Integer id, @RequestBody Integer garageId) {
        Optional<VoitureEntity> voiture = voitureRepository.findById(id);
        if (voiture.isPresent()) {
            VoitureEntity existingVoiture = voiture.get();
            if (garageId == -1){
                garageId=null;
            }
            existingVoiture.setGarage(garageId);
            VoitureEntity updatedVoiture = voitureRepository.save(existingVoiture);
            return new ResponseEntity<>(updatedVoiture, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PatchMapping("/{id}/modele")
    public ResponseEntity<VoitureEntity> updateModele(@PathVariable Integer id, @RequestBody String modele){
        Optional <VoitureEntity> voiture = voitureRepository.findById(id);
        if (voiture.isPresent()){
            VoitureEntity existingVoiture = voiture.get();
            existingVoiture.setModele(modele);

            VoitureEntity updatedVoiture = voitureRepository.save(existingVoiture);
            return new ResponseEntity<>(updatedVoiture, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PatchMapping("/{id}/couleur")
    public ResponseEntity<VoitureEntity> updateCouleur(@PathVariable Integer id, @RequestBody String couleur){
        Optional <VoitureEntity> voiture = voitureRepository.findById(id);
        if (voiture.isPresent()){
            VoitureEntity existingVoiture = voiture.get();
            existingVoiture.setCouleur(couleur);

            VoitureEntity updatedVoiture = voitureRepository.save(existingVoiture);
            return new ResponseEntity<>(updatedVoiture, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
