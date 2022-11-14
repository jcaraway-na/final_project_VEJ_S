using Opti_Api_5.Data.DTOs;
using Opti_Api_5.Data.Models;
using System.Collections.Generic;
using System.Linq;

namespace Opti_Api_5.Data.Services
{    
    public class PopulationServices
    {
        private AppDbContex _context;

        public PopulationServices(AppDbContex contex)
        {
            _context = contex;
        }

        public void AddPopulation(PopulationDTO population)
        {
            var _population = new PopulationModel()
            {
                year = population.year,
                population = population.population,
                growth_rate = population.growth_rate
            };
            _context.Population.Add(_population);
            _context.SaveChanges();
        }

        public List<PopulationModel> GetAllPopulations() => _context.Population.ToList();

        public PopulationModel GetPopulationById(int id) => _context.Population.FirstOrDefault(n => n.id == id);

        public PopulationModel UpdatePopulationById(int id, PopulationDTO population)
        {
            var _population = _context.Population.FirstOrDefault(n => n.id == id);
            if (_population != null)
            {
                _population.year = population.year;
                _population.population = population.population;
                _population.growth_rate = population.growth_rate;

                
                _context.SaveChanges();
            }
            return _population;
        }

    }
}
