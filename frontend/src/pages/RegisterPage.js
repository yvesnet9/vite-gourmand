import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nom: '', prenom: '', email: '', password: '',
    password_confirmation: '', gsm: '', adresse: '', consentement_rgpd: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.consentement_rgpd) {
      setError('Vous devez accepter la politique de confidentialité pour continuer.');
      return;
    }
    if (formData.password !== formData.password_confirmation) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    setLoading(true);
    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px' }}>
      <h1>Inscription</h1>
      <p style={{ color: '#555' }}>Tous les champs sont obligatoires.</p>

      {error && (
        <div role="alert" style={{ padding: '10px', background: '#f8d7da', color: '#721c24', borderRadius: '5px', marginBottom: '20px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="nom">Nom :</label>
          <input id="nom" type="text" name="nom" value={formData.nom} onChange={handleChange} required autoComplete="family-name" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="prenom">Prénom :</label>
          <input id="prenom" type="text" name="prenom" value={formData.prenom} onChange={handleChange} required autoComplete="given-name" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email :</label>
          <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required autoComplete="email" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password">Mot de passe :</label>
          <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} required minLength="10" autoComplete="new-password" aria-describedby="password-hint" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          <small id="password-hint">Au moins 10 caractères, avec majuscule, minuscule, chiffre et caractère spécial</small>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password_confirmation">Confirmer le mot de passe :</label>
          <input id="password_confirmation" type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required minLength="10" autoComplete="new-password" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="gsm">Téléphone :</label>
          <input id="gsm" type="tel" name="gsm" value={formData.gsm} onChange={handleChange} required autoComplete="tel" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="adresse">Adresse :</label>
          <textarea id="adresse" name="adresse" value={formData.adresse} onChange={handleChange} required autoComplete="street-address" style={{ width: '100%', padding: '8px', marginTop: '5px', minHeight: '60px' }} />
        </div>

        <div style={{ marginBottom: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '5px' }}>
          <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
            <input type="checkbox" name="consentement_rgpd" checked={formData.consentement_rgpd} onChange={handleChange} required style={{ marginRight: '10px', marginTop: '3px' }} />
            <span>
              J'accepte la <Link to="/politique-confidentialite" target="_blank" style={{ color: '#0a58ca' }}>politique de confidentialité</Link> et
              les <Link to="/mentions-legales" target="_blank" style={{ color: '#0a58ca' }}>conditions d'utilisation</Link> *
            </span>
          </label>
        </div>

        <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Inscription...' : 'S\'inscrire'}
        </button>
      </form>

      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Déjà inscrit ? <Link to="/login">Se connecter</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
