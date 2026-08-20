# Horloge Numérique - Fuseaux Horaires 🕐

Une application web moderne affichant l'heure actuelle dans différents fuseaux horaires du monde. Construite avec HTML, CSS et JavaScript vanilla, sans dépendances externes.

## ✨ Fonctionnalités

✅ **Horloges Numériques en Temps Réel** - Mise à jour chaque seconde  
✅ **25+ Fuseaux Horaires** - Villes principales du monde  
✅ **Format 12/24 Heures** - Basculer entre les formats  
✅ **Ajout/Suppression Dynamique** - Gérer vos fuseaux horaires préférés  
✅ **Stockage Local** - Vos paramètres sont automatiquement sauvegardés  
✅ **Design Responsive** - Fonctionne sur tous les appareils  
✅ **Interface Moderne** - Gradients, animations et couleurs vives  
✅ **Informations Complètes** - Date, jour, heure dans chaque fuseau horaire  

## 🚀 Démarrage Rapide

### Installation

1. Clonez le dépôt:
```bash
git clone https://github.com/mamady62000-boop/digital-clock-timezones.git
cd digital-clock-timezones
```

2. Ouvrez le fichier dans votre navigateur:
```bash
open index.html
# ou
start index.html
```

C'est tout! Aucune dépendance n'est nécessaire.

## 📖 Guide d'Utilisation

### Ajouter un Fuseau Horaire

1. Sélectionnez un fuseau horaire dans la liste déroulante
2. Cliquez sur le bouton **+ Ajouter**
3. Une nouvelle horloge s'affichera dans la grille

### Changer le Format de l'Heure

- Cliquez sur **12H** pour afficher au format 12 heures (avec AM/PM)
- Cliquez sur **24H** pour afficher au format 24 heures

### Supprimer une Horloge

- Cliquez sur le bouton **×** dans le coin supérieur droit de la carte d'horloge

### Réinitialiser Toutes les Horloges

- Cliquez sur le bouton **Réinitialiser**
- Confirmez la suppression

## 🌍 Fuseaux Horaires Disponibles

- 🇺🇸 **Amériques**: New York, Los Angeles, Chicago, Toronto, Vancouver, Mexico City, São Paulo
- 🇪🇺 **Europe**: Londres, Paris, Moscou, Istanbul, Reykjavik
- 🇦🇸 **Asie**: Tokyo, Hong Kong, Singapour, Bangkok, Shanghai, Mumbai, Dubaï
- 🇦🇺 **Océanie**: Sydney, Auckland
- 🇦🇫 **Afrique**: Le Caire, Johannesburg

## 💾 Stockage Local

Vos paramètres sont sauvegardés automatiquement dans le navigateur:
- Horloges ajoutées
- Format d'heure choisi
- État de couleur des cartes

Les données ne sont stockées que localement sur votre appareil.

## 🎨 Personnalisation

### Modifier les Couleurs

Modifiez les gradients dans `styles.css`:

```css
header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Ajouter des Fuseaux Horaires

Modifiez le tableau `timezones` dans `script.js`:

```javascript
this.timezones = [
    { name: 'Ma Ville', offset: 'Continent/Ville' },
    // ...
];
```

## 🛠️ Structure du Projet

```
digital-clock-timezones/
├── index.html      # Markup HTML
├── styles.css      # Styles et responsive design
├── script.js       # Logique de l'application
└── README.md       # Documentation
```

## 🔧 Technologie Utilisée

- **HTML5**: Markup sémantique
- **CSS3**: Flexbox, gradients, animations
- **Vanilla JavaScript**: Intl API pour les fuseaux horaires
- **LocalStorage API**: Persistance des données

## 📱 Compatibilité Navigateurs

✅ Chrome/Chromium  
✅ Firefox  
✅ Safari  
✅ Edge  
✅ Opera  

## 🌐 API Fuseaux Horaires

L'application utilise l'API native JavaScript `Intl.DateTimeFormat` pour les fuseaux horaires:
- Support des noms IANA de fuseaux horaires
- Gestion automatique du décalage horaire (DST)
- Pas d'API externe requise

## 📋 Noms IANA des Fuseaux Horaires

La liste complète des fuseaux horaires valides est disponible à:
https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

Format: `Continent/Ville` (exemple: `Europe/Paris`, `America/New_York`)

## 🚀 Améliorations Futures

Idées pour améliorer l'application:
- 🌙 Mode sombre
- 📊 Graphique de différence horaire
- 🔔 Rappels et alarmes
- 📍 Détection automatique de la localisation
- 🎯 Horloge analogique
- 📤 Export/Import des paramètres
- 🔍 Recherche de fuseaux horaires
- 📱 App PWA (Progressive Web App)

## 📝 Licence

Ce projet est open source sous la licence MIT.

## 🤝 Contribution

Les contributions sont les bienvenues! Veuillez:
1. Fork le dépôt
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Faire vos changements
4. Commit (`git commit -m 'Add amazing feature'`)
5. Push vers la branche (`git push origin feature/amazing-feature`)
6. Ouvrir une Pull Request

## 💬 Support

Si vous avez des questions ou des problèmes, veuillez ouvrir une issue sur GitHub.

---

**Bonne gestion du temps! ⏰**