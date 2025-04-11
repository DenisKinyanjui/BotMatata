import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Home,
  UserPlus,
  MoreVertical,
  Check,
  X,
  AlertTriangle,
  ChevronDown,
  Eye,
  Settings,
  MessageSquare,
  CreditCard,
  Users,
  BarChart2,
} from 'lucide-react';
import DashboardSidebar from '../components/DashboardSidebar';
import toast from 'react-hot-toast';

// Mock data for team members
const initialTeamMembers = [
  {
    id: 1,
    name: 'Jane Muthoni',
    email: 'jane@company.co.ke',
    role: 'editor',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  },
  {
    id: 2,
    name: 'Brian Otieno',
    email: 'brian@biz.co.ke',
    role: 'viewer',
    status: 'invited',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
  },
  {
    id: 3,
    name: 'Sarah Kamau',
    email: 'sarah@example.com',
    role: 'admin',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
  },
];

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
];

const permissions = [
  {
    feature: 'View & respond to chats',
    admin: true,
    editor: true,
    viewer: 'view',
  },
  {
    feature: 'Edit Chatbot Settings',
    admin: true,
    editor: true,
    viewer: false,
  },
  {
    feature: 'Billing & Subscriptions',
    admin: true,
    editor: false,
    viewer: false,
  },
  {
    feature: 'Manage Team',
    admin: true,
    editor: 'view',
    viewer: false,
  },
  {
    feature: 'Access Analytics',
    admin: true,
    editor: true,
    viewer: 'view',
  },
];

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string, role: string) => void;
}

const InviteModal: React.FC<InviteModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('viewer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, role);
    setEmail('');
    setRole('viewer');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Invite Team Member</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-botmatata-blue focus:ring-botmatata-blue sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-botmatata-blue focus:ring-botmatata-blue sm:text-sm"
            >
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-botmatata-blue"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-botmatata-blue rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-botmatata-blue"
            >
              Send Invite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-4">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-botmatata-blue"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

const Team = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showPermissions, setShowPermissions] = useState(false);
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [confirmAction, setConfirmAction] = useState<{
    title: string;
    message: string;
    action: () => void;
  } | null>(null);

  const handleInvite = (email: string, role: string) => {
    const newMember = {
      id: Date.now(),
      name: email.split('@')[0],
      email,
      role,
      status: 'invited',
      avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`,
    };
    setTeamMembers([...teamMembers, newMember]);
    setShowInviteModal(false);
    toast.success('Invitation sent successfully!');
  };

  const handleRemoveMember = (member: any) => {
    setSelectedMember(member);
    setConfirmAction({
      title: 'Remove Team Member',
      message: `Are you sure you want to remove ${member.name} from the team?`,
      action: () => {
        setTeamMembers(teamMembers.filter((m) => m.id !== member.id));
        toast.success('Team member removed successfully');
      },
    });
    setShowConfirmModal(true);
  };

  const handleResendInvite = (member: any) => {
    toast.success(`Invitation resent to ${member.email}`);
  };

  const handleRoleChange = (memberId: number, newRole: string) => {
    setTeamMembers(
      teamMembers.map((member) =>
        member.id === memberId ? { ...member, role: newRole } : member
      )
    );
    toast.success('Role updated successfully');
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'invited':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPermissionIcon = (permission: boolean | string) => {
    if (permission === true) return <Check className="h-5 w-5 text-green-500" />;
    if (permission === 'view') return <Eye className="h-5 w-5 text-blue-500" />;
    return <X className="h-5 w-5 text-red-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="lg:pl-64">
        <main className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Link to="/dashboard" className="hover:text-gray-700">
                <Home size={16} />
              </Link>
              <ChevronRight size={16} className="mx-2" />
              <span>Team & Access</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Manage Your Team</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Invite team members to help manage your chatbot, conversations, and analytics.
                </p>
              </div>
              <button
                onClick={() => setShowInviteModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-botmatata-blue hover:bg-opacity-90"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Member
              </button>
            </div>
          </div>

          {/* Team Members Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Member
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teamMembers.map((member) => (
                    <tr key={member.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={member.avatar}
                            alt={member.name}
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                            <div className="text-sm text-gray-500">{member.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={member.role}
                          onChange={(e) => handleRoleChange(member.id, e.target.value)}
                          className="text-sm rounded-md border-gray-300 shadow-sm focus:border-botmatata-blue focus:ring-botmatata-blue"
                        >
                          {roles.map((role) => (
                            <option key={role.value} value={role.value}>
                              {role.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(
                            member.status
                          )}`}
                        >
                          {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {member.status === 'invited' ? (
                          <button
                            onClick={() => handleResendInvite(member)}
                            className="text-botmatata-blue hover:text-botmatata-coral mr-4"
                          >
                            Resend Invite
                          </button>
                        ) : null}
                        <button
                          onClick={() => handleRemoveMember(member)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Permissions Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <button
                onClick={() => setShowPermissions(!showPermissions)}
                className="flex items-center text-sm font-medium text-gray-700"
              >
                <ChevronDown
                  className={`h-5 w-5 mr-2 transform transition-transform ${
                    showPermissions ? 'rotate-180' : ''
                  }`}
                />
                Role Permissions
              </button>
            </div>
            {showPermissions && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Feature
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Admin
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Editor
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Viewer
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {permissions.map((permission) => (
                      <tr key={permission.feature}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {permission.feature}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {getPermissionIcon(permission.admin)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {getPermissionIcon(permission.editor)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {getPermissionIcon(permission.viewer)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      <InviteModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onSubmit={handleInvite}
      />

      {confirmAction && (
        <ConfirmationModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={confirmAction.action}
          title={confirmAction.title}
          message={confirmAction.message}
        />
      )}
    </div>
  );
};

export default Team;