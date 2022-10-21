using Microsoft.EntityFrameworkCore;
using Opti_Api_5.Data.DTOs;
using Opti_Api_5.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Opti_Api_5.Data
{
    public class AppDbContex
    {
        public DbSet<CrashModel> Crash { get; set; }
    }
}
