using Cards.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Cards.API.Data
{
    public class CardsDbContext : DbContext
    {
        public CardsDbContext(DbContextOptions options) : base(options)
        {
        }
        // Dbset - replica da tabela do sql
        public DbSet<Card> Cards { get; set; }
    }
}
