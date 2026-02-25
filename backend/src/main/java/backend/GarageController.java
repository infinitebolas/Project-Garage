package backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

}
