using Microsoft.EntityFrameworkCore;


namespace LabCours.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){ }

        public DbSet<Employe> Employes { get; set; }

        //public DbSet<User> Users { get; set; }

        public DbSet<User> Users => Set<User>();
    }
   

    
}
