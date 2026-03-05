package backend;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VoitureRepository extends JpaRepository <VoitureEntity, Integer> {
    List<VoitureEntity> findByGarage(Integer garageId);
}
