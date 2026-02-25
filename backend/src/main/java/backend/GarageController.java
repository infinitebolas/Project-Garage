package backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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

}
