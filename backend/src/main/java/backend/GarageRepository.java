package backend;

import org.springframework.data.jpa.repository.JpaRepository;


public interface GarageRepository extends JpaRepository<GarageEntity, Integer> {
}
