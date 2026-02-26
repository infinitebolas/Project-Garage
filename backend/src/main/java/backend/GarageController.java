package backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/garages")
public class GarageController {

    final GarageRepository garageRepository;

    public GarageController(GarageRepository garageRepository){
        this.garageRepository = garageRepository;
    }

    @GetMapping
    public ResponseEntity<List<GarageEntity>> getAllGarages(){
        return new ResponseEntity<>(garageRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<GarageEntity> createGarage(@RequestBody GarageEntity garage) {
        GarageEntity garageCreated = garageRepository.save(garage);
        return new ResponseEntity<>(garageCreated, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GarageEntity> getGarageById(@PathVariable Integer id) {
        Optional<GarageEntity> garage =garageRepository.findById(id);
        return garage.map(garageEntity -> new ResponseEntity<>(garageEntity, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));

    }

    @PutMapping("/{id}")
    public ResponseEntity<GarageEntity> updateGarage(@PathVariable Integer id, @RequestBody GarageEntity garageUpdate){
        Optional<GarageEntity> garage = garageRepository.findById(id);
        if (garage.isPresent()){
            GarageEntity existingGarage = garage.get();
            existingGarage.setNom(garageUpdate.getNom());
            existingGarage.setDescription(garageUpdate.getDescription());
            existingGarage.setAdresse(garageUpdate.getAdresse());

            GarageEntity updateGarage = garageRepository.save(existingGarage);
            return new ResponseEntity<>(updateGarage, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGarage(@PathVariable Integer id) {
        Optional<GarageEntity> garage = garageRepository.findById(id);
        if (garage.isPresent()){
            garageRepository.delete(garage.get());
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}




