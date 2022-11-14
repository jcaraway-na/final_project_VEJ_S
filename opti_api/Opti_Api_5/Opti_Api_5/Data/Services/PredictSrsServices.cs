using Opti_Api_5.Data.DTOs;
using Opti_Api_5.Data.Models;
using System.Collections.Generic;
using System.Linq;

namespace Opti_Api_5.Data.Services
{    
    public class PredictSrsServices
    {
        private AppDbContex _context;

        public PredictSrsServices(AppDbContex contex)
        {
            _context = contex;
        }

        public void AddPrediction(PredictSrsDTO predictSrs)
        {
            var _predictSrs = new PredictSrsModel()
            {
                Month = predictSrs.Month,
                Prediction = predictSrs.Prediction,
                Actual = predictSrs.Actual,
                Crashes_Avoided = predictSrs.Crashes_Avoided
            };
            _context.PredictSrs.Add(_predictSrs);
            _context.SaveChanges();
        }

        public PredictSrsModel GetPredictionById(int id) => _context.PredictSrs.FirstOrDefault(n => n.id == id);

        public List<PredictSrsModel> GetAllPredictions() => _context.PredictSrs.ToList();

        public PredictSrsModel UpdatePredictionById(int id, PredictSrsDTO predictSrs)
        {
            var _predictSrs = _context.PredictSrs.FirstOrDefault(n => n.id == id);
            if (_predictSrs != null)
            {
                _predictSrs.Month = predictSrs.Month;
                _predictSrs.Prediction = predictSrs.Prediction;
                _predictSrs.Actual = predictSrs.Actual;
                _predictSrs.Crashes_Avoided = predictSrs.Crashes_Avoided;

                _context.SaveChanges();
            }
            return _predictSrs;
        }

    }
}
