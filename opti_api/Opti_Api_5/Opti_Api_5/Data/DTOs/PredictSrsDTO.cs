using System;

namespace Opti_Api_5.Data.DTOs
{
    public class PredictSrsDTO
    {
        public string Month { get; set; }
        public double Prediction { get; set; }
        public int Actual { get; set; }
        public int Crashes_Avoided { get; set; }
    }
}