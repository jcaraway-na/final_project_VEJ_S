using Opti_Api_5.Data.DTOs;
using Opti_Api_5.Data.Models;
using System.Collections.Generic;
using System.Linq;

namespace Opti_Api_5.Data.Services
{    
    public class TotalSeriousAccidentsPerYearServices
    {
        private AppDbContex _context;

        public TotalSeriousAccidentsPerYearServices(AppDbContex contex)
        {
            _context = contex;
        }

        public void AddTSAPY(TotalSeriousAccidentsPerYearDTO tsapy)
        {
            var _tsapy = new TotalSeriousAccidentsPerYearModel()
            {
                year = tsapy.year,
                serious_fl = tsapy.serious_fl,
                id = tsapy.id,
                population = tsapy.population,
                growth_rate = tsapy.growth_rate
            };
            _context.Tsapy.Add(_tsapy);
            _context.SaveChanges();
        }

        public List<TotalSeriousAccidentsPerYearModel> GetAllTsapy() => _context.Tsapy.ToList();

        public TotalSeriousAccidentsPerYearModel GetTsapyById(int index_id) => _context.Tsapy.FirstOrDefault(n => n.index_id == index_id);

        public TotalSeriousAccidentsPerYearModel UpdateTsapyById(int index_id, TotalSeriousAccidentsPerYearDTO tsapy)
        {
            var _tsapy = _context.Tsapy.FirstOrDefault(n => n.index_id == index_id);
            if (_tsapy != null)
            {
                _tsapy.year = tsapy.year;
                _tsapy.serious_fl = tsapy.serious_fl;
                _tsapy.id = tsapy.id;
                _tsapy.population = tsapy.population;
                _tsapy.growth_rate = tsapy.growth_rate;

                _context.SaveChanges();
            }
            return _tsapy;
        }

    }
}
