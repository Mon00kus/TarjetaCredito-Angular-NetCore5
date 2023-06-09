using FBTarjetaCredito.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FBTarjetaCredito.Persistence
{
    public class AplicationDBContext : DbContext
    {
        public DbSet<TarjetaCredito> TarjetaCredito { get; set; }
        public AplicationDBContext(DbContextOptions<AplicationDBContext> options ) : base (options)
        {
            
        }
    }
}
